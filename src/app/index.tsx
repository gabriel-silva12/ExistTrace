import { Redirect } from "expo-router"; // chamam isso de "gateway"
import { supabase } from "@/services/supabase";
const indexGateway = () => {
  return <Redirect href="/login" />
}

export default indexGateway