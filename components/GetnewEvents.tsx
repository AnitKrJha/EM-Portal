import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'

type Props = {
    getEvent:()=>{}
    isLoading:boolean
}

const GetnewEvents = (props: Props) => {
  return (
    <Box height='120px' bg='red.500' width={'100vw'} >
 <Flex   textColor={'white'} fontWeight='semibold' fontSize={'3xl'} align='' justify={'center'}>To Fetch new Events </Flex>
<Box textAlign={'center'}>

 <Button isLoading={props.isLoading} variant={'outline'} bg='white' mt={'20px'} fontSize='2xl' onClick={props.getEvent}>Click Here</Button>
</Box>
    </Box>
  )

}

export default GetnewEvents