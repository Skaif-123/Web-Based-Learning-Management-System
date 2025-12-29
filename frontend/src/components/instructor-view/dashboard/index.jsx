import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate= useNavigate();
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center overflow-x-auto">
          <CardTitle className="text-3xl font-extrabold">ALL COURSES</CardTitle>
          <button onClick={()=>navigate("/instructor/Create-New-Course")} className="bg-black p-3 hover:font-bold cursor-pointer text-white rounded-xl">
            Create New Courses
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Course</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Basic To Advanced Javascript</TableCell>
                  <TableCell>190</TableCell>
                  <TableCell>$7500</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button className="bg-green-400 hover:bg-green-600">
                      <Edit2></Edit2>
                    </Button>
                    <Button className="bg-red-400 hover:bg-red-600 ">
                    <MdDeleteForever style={{ color: 'white', fontSize: '30px' }} />
                    </Button>
                      
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashBoard;
