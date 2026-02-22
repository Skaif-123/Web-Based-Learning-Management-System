import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CoursePage = ({ listOfCourses }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center overflow-x-auto">
          <CardTitle className="text-3xl font-extrabold">ALL COURSES</CardTitle>
          <button
            onClick={() => navigate("/instructor/Create-New-Course")}
            className="bg-black p-3 hover:font-bold cursor-pointer text-white rounded-xl"
          >
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
                {listOfCourses && listOfCourses.length > 0
                  ? listOfCourses.map((course) => (
                      <TableRow>
                        <TableCell className="font-medium">
                          {course?.title}
                        </TableCell>
                        <TableCell>{course?.students?.length}</TableCell>
                        <TableCell>${course?.pricing}</TableCell>
                        <TableCell className="text-right flex justify-end gap-2">
                          <Button className="bg-green-400 hover:bg-green-600">
                            <Edit2></Edit2>
                          </Button>
                          <Button className="bg-red-400 hover:bg-red-600 ">
                            <MdDeleteForever
                              style={{ color: "white", fontSize: "30px" }}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CoursePage;
