import React, { useEffect, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

export default function Park() {
  const [park, setpark] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const res = await fetch("http://localhost:8080/userform");
      const getcon = await res.json();
      setpark(await getcon);
    };
    getdata();
  }, [park]);

  const handledelete = async (e) => {
    await fetch(`http://localhost:8080/userform/${e.id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Wisestep all car details</TableCaption>
          <Thead>
            <Tr>
              <Th>car id</Th>
              <Th>user name </Th>
              <Th>user Number </Th>
            </Tr>
          </Thead>
          <Tbody>
            {park.map((e) => (
              <Tr key={e.id}>
                <Td>{e.id}</Td>
                <Td>{e.name}</Td>
                <Td isNumeric>{e.number}</Td>
                <Button
                  onClick={(f) => {
                    handledelete(e);
                  }}
                  bg="red"
                >
                  Delete
                </Button>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
