import React, { useState } from 'react';
import { Box, Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface SubDepartment {
  id: number;
  subDept: string;
}

interface Department {
  id: number;
  department: string;
  sub_departments: SubDepartment[];
}

const departmentData: Department[] = [
  {
    id: 1,
    department: "customer_service (2)",
    sub_departments: [
      { id: 11, subDept: "support" },
      { id: 12, subDept: "customer_success" },
    ],
  },
  {
    id: 2,
    department: "design (3)",
    sub_departments: [
      { id: 21, subDept: "graphic_design" },
      { id: 22, subDept: "product_design" },
      { id: 23, subDept: "web_design" },
    ],
  },
  {
    id: 3,
    department: "Design & Development (5)",
    sub_departments: [
      { id: 31, subDept: "Web App Development" },
      {id : 32, subDept: "Mobile App Development"},
      { id: 33, subDept: "E-commerce Development" },
      { id: 34, subDept: "CMS Development" },
      {id : 35, subDept: "Custom Development"},
    ],
  },
  {
    id: 4,
    department: "Business Services (7)",
    sub_departments: [
      { id: 41, subDept: "Accounting & Accounting Services" },
      { id: 42, subDept: "Auctions" },
      { id: 43, subDept: "Business Services-General" },
      { id: 44, subDept: "Call Centers & Business Centers" },
      { id: 45, subDept: "Career Planning" },
      { id: 46, subDept: "Career" },
      { id: 47, subDept: "Commercial Printing" },
    ],
  },
];

interface SelectedValue {
  departmentId: number;
  subDept: string;
}

const Component2: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [selectedValues, setSelectedValues] = useState<SelectedValue[]>([]);

  const handleToggle = (departmentId: number) => {
    setOpen((prevOpen) => (prevOpen === departmentId ? null : departmentId));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, departmentId: number) => {
    const { value, checked } = e.target;

    if (value === 'all') {
      const subDepartments = departmentData.find((department) => department.id === departmentId)?.sub_departments || [];
      const updatedValues = checked
        ? [...selectedValues, ...subDepartments.map((subDept) => ({ departmentId, subDept: subDept.subDept }))]
        : selectedValues.filter((item) => item.departmentId !== departmentId);
      setSelectedValues(updatedValues);
    } else {
      setSelectedValues((prevValues) => {
        const updatedValues = [...prevValues];
        const index = updatedValues.findIndex(
          (item) => item.departmentId === departmentId && item.subDept === value
        );

        if (index === -1) {
          updatedValues.push({ departmentId, subDept: value });
        } else {
          updatedValues.splice(index, 1);
        }

        return updatedValues;
      });
    }
  };

  const isIndeterminate = (departmentId: number): boolean => {
    const subDepartments =
      departmentData.find((department) => department.id === departmentId)?.sub_departments || [];
    const selectedSubDepts = selectedValues
      .filter((item) => item.departmentId === departmentId)
      .map((item) => item.subDept);
    return selectedSubDepts.length > 0 && selectedSubDepts.length < subDepartments.length;
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">List of department and each department has sub departments with the features given below:</Typography>
      <ol style={{fontSize:'1.25rem'}}>
        <li style={{margin:'5px 0px'}}>users can expand or collapse the sub departments by clicking on arrow icon.</li>
        <li style={{margin:'5px 0px'}}>If user select a department then all of the sub departments must get selected.</li>
        <li style={{margin:'5px 0px'}}>If user select all sub departments of a department then the parent department must get selected as well.</li>
      </ol>
      {departmentData.map((department) => (
        <div key={department.id}>
          <ListItem>
              <Checkbox
                value='all'
                indeterminate={isIndeterminate(department.id)}
                checked={
                  selectedValues.some((item) => item.departmentId === department.id) &&
                  selectedValues.every(
                    (item) => item.departmentId === department.id || item.subDept
                  )
                }
                onChange={(e) => handleChange(e, department.id)}
              />
            <ListItemText primary={department.department} sx={{ flex: '0 1 auto' }} />
            <ListItemIcon onClick={() => handleToggle(department.id)}>
              {open === department.id ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          </ListItem>

          <Collapse in={open === department.id} timeout='auto' unmountOnExit>
            <List component='div' sx={{ml:2.5, p:0}}>
              {department.sub_departments.map((subDept) => (
                <ListItem key={subDept.id} sx={{py:0}}>
                  <ListItemIcon>
                    <Checkbox
                      value={subDept.subDept}
                      onChange={(e) => handleChange(e, department.id)}
                      checked={selectedValues.some(
                        (item) => item.departmentId === department.id && item.subDept === subDept.subDept
                      )}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept.subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </Box>
  );
};

export default Component2;