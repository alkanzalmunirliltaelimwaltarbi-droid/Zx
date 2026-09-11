import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return new Response(JSON.stringify({ error: "رمز الدخول مطلوب" }), { status: 400, headers: {...cors, "Content-Type":"application/json"} });
    }

    // Store only salted hashes in Supabase secrets/environment in production.
    // DEMO_USER_CODE and DEMO_ADMIN_CODE are placeholders and MUST be replaced.
    const userCode = Deno.env.get("DEMO_USER_CODE") ?? "";
    const adminCode = Deno.env.get("DEMO_ADMIN_CODE") ?? "";

    let role: "user" | "admin" | null = null;
    if (code === adminCode && adminCode) role = "admin";
    else if (code === userCode && userCode) role = "user";

    if (!role) {
      return new Response(JSON.stringify({ error: "رمز الدخول غير صحيح" }), { status: 401, headers: {...cors, "Content-Type":"application/json"} });
    }

    // In the production version, replace this temporary response with
    // a short-lived signed session/JWT issued by a trusted backend.
    return new Response(JSON.stringify({ role }), { status: 200, headers: {...cors, "Content-Type":"application/json"} });
  } catch {
    return new Response(JSON.stringify({ error: "طلب غير صالح" }), { status: 400, headers: {...cors, "Content-Type":"application/json"} });
  }
});
