import React, { useEffect } from "react";
import {
  Button,
  Flex,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function Home() {
  const [outlets, setoutlets] = useState([]);
  const [vehiclesid, setvehiclesid] = useState("");
  const [vehicles, setvehicles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userdata, setuserdata] = useState({});
  const [userform, setuserform] = useState({});
  const toast = useToast();
  useEffect(() => {
    const getdata = async () => {
      const res = await fetch("http://localhost:8080/outlets");
      const getcon = await res.json();
      setoutlets(await getcon);
    };
    getdata();
  }, []);

  const handlechange = (event) => {
    const getid = event.target.value;
    console.log();
    setvehiclesid(getid);
    const getvehicles = async () => {
      const res1 = await fetch(`http://localhost:8080/outlets/${vehiclesid}`);
      const getcon1 = await res1.json();
      setvehicles(getcon1.vehicles);
      setuserdata({ ...userdata, name: getcon1.outlet });
    };
    getvehicles();
  };
  const handlechang2 = (event) => {
    setuserdata({ ...userdata, car: event.target.value });
  };

  const inputhandal = (e) => {
    setuserform({
      ...userform,

      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = () => {
    axios.post(`http://localhost:8080/userform`, userform).then((e) => {
      console.log(e.data);
    });
  };

  return (
    <div>
      <Text fontSize={"20px"}>Welcome to Wisestep</Text>
      <Flex>
        <Select margin={"20px"} onChange={(e) => handlechange(e)}>
          <option>Select outlets</option>
          {outlets.map((e) => (
            <option key={e.id} value={e.id}>
              {" "}
              {e.outlet}
            </option>
          ))}
        </Select>
        {vehicles == undefined ? (
          <Select
            margin={"20px"}
            placeholder=" first select a outlets"
          ></Select>
        ) : (
          <Select
            name="outlet"
            onChange={(e) => handlechang2(e)}
            margin={"20px"}
          >
            {vehicles.map((e) => (
              <option key={e.car} value={e.car}>
                {e.car}
              </option>
            ))}
          </Select>
        )}
        <Button
          name="car"
          onClick={() => {
            onOpen();
          }}
          padding={"20px"}
          margin={"20px"}
          bg="green"
        >
          Submit{" "}
        </Button>
      </Flex>

      <Button>
        <Link to="/park">park the vehicle</Link>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wisestep</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              minH={"100vh"}
              align={"center"}
              justify={"center"}
              bg={useColorModeValue("gray.50", "gray.800")}
            >
              <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                  <Heading fontSize={"4xl"}>fell form </Heading>
                  <Heading fontSize={"2xl"}>
                    user outlet : {userdata.name}{" "}
                  </Heading>
                  <Heading fontSize={"2xl"}>user car : {userdata.car}</Heading>
                </Stack>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel> You Name</FormLabel>
                      <Input
                        onChange={(e) => {
                          inputhandal(e);
                        }}
                        name="name"
                        type="text"
                      />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>You Number</FormLabel>
                      <Input
                        onChange={(e) => {
                          inputhandal(e);
                        }}
                        name="number"
                        type="number"
                      />
                    </FormControl>
                    <Stack spacing={10}>
                      <Button
                        onClick={() => {
                          handlesubmit();
                          onClose();
                          toast({
                            title: "You have 15 min to pick you car",
                            description: "Thank you",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: "top",
                          });
                        }}
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
