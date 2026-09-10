import { Redirect } from "expo-router"; // chamam isso de "gateway"

const indexGateway = () => {
  return <Redirect href="/login" />
}

export default indexGateway