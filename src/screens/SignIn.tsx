import { Center, Text } from 'native-base'
import { THEME } from "../styles/theme";

export function SignIn(){
  return(
      <Center flex={1} bgColor="gray.900">
        <Text color="white" fontSize={20}>
          Sign In
        </Text>
      </Center>
  )
}