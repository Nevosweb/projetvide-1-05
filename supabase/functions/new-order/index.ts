
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    // Create a Supabase client with the service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse the request body
    const orderData = await req.json();
    
    // Validate required fields
    const requiredFields = ["restaurant_id", "customer_name", "phone", "pickup_slot", "total", "status"];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        console.error(`Missing required field: ${field}`);
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }), 
          { headers: corsHeaders, status: 400 }
        );
      }
    }

    // Format pickup_time (convert ISO string to PostgreSQL compatible timestamp)
    const pickupTime = new Date(orderData.pickup_slot);
    if (isNaN(pickupTime.getTime())) {
      return new Response(
        JSON.stringify({ error: "Invalid pickup_slot format. Expected ISO date string." }), 
        { headers: corsHeaders, status: 400 }
      );
    }

    // Prepare data for insertion
    const orderInsertData = {
      restaurant_id: orderData.restaurant_id,
      customer_name: orderData.customer_name,
      phone: orderData.phone,
      pickup_time: pickupTime.toISOString(),
      pickup_slot: pickupTime.toISOString(),
      items: orderData.items,
      total: parseFloat(orderData.total) || 0,
      amount: parseFloat(orderData.total) || 0, // amount is required and matches total
      status: orderData.status || "pending"
    };

    // Insert order into database
    const { data, error } = await supabase
      .from("orders")
      .insert([orderInsertData])
      .select();

    if (error) {
      console.error("Error inserting order:", error);
      return new Response(
        JSON.stringify({ error: error.message }), 
        { headers: corsHeaders, status: 500 }
      );
    }

    console.log("Order created successfully:", data);
    return new Response(
      JSON.stringify({ success: true, orderId: data[0].id }), 
      { headers: corsHeaders, status: 200 }
    );
    
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }), 
      { headers: corsHeaders, status: 500 }
    );
  }
});
