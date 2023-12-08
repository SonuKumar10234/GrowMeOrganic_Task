import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography , Box  } from "@mui/material";
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


const Component1: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  
  const fetchData = async() =>{
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await resp.json();
    setData(data);
    
  }
  useEffect(() => {
    // Fetching data from the API
    fetchData();
      
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 600 },
  ];

  return (
    <Box  >
        <Typography variant="h6" mb={2}>Display the data in a table</Typography>
      <DataGrid rows={data} columns={columns} initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5,10]}
        checkboxSelection 
        disableRowSelectionOnClick
        />
    </Box>
  );
};

export default Component1;
  