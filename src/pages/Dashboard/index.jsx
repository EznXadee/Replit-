import "./styles.scss";
import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaHome,
  FaChartBar,
  FaCog,
  FaTimes,
  FaDownload
} from "react-icons/fa";
import { Input, Button, Card, Text, FileInput } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Page() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [page, setPage] = useState(0);

  const handleFileChange = (file, setFile) => {
    setFile(file);
  };

  const handleSubmit = () => {
    if (file1 && file2) {
      alert("Files uploaded successfully!");
    } else {
      alert("Please upload both Excel files.");
    }
  };

  useEffect(() => {
    //Add Global page event listener to close the sidebar if clicked outside
    const closeSidebar = () => {
      if (isSidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", closeSidebar);
  })

  return (
    <main id="dashboard" className="flex">
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        id="sidebar"
      >
        <div className="sidebar-header flex items-center justify-between mb-4 z-990 relative">
          <h2 className="m-auto text-xl font-bold text-white ml-4">CRM Menu</h2>
          <button
            className="text-gray-400 hover:text-white md:hidden"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <ul>
          <li onClick={() => { setPage(0) }} className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-600 hover:text-blue-400 transition cursor-pointer">
            <FaChartBar size={20} />
            <span>Analysis</span>
          </li>
          <li onClick={() => { setPage(1) }} className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-600 hover:text-blue-400 transition cursor-pointer">
            <FaDownload size={20} />
            <span>Samples</span>
          </li>
        </ul>

        <div className="sidebar-footer mt-auto">
          <p className="text-sm text-gray-400 mt-6 ">© 2024 CRM AI Watchdog</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 p-6 md:ml-64">
        <header className="navbar flex items-center justify-between p-4 bg-white shadow-md">
          <div className="flex items-center">
            <button
              className="menu-btn text-gray-600 mr-4 md:hidden"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!isSidebarOpen);
              }}
            >
              <FaBars size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-700">CRM AI Watchdog</h1>
          </div>
          <div className="search-container flex justify-center">
            <Input
              radius="xl"
              placeholder="Search"
              className="min-w-[290px] focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="icons flex items-center">
            <FaBell className="icon text-gray-400 hover:text-blue-500" size={20} />
            <FaUserCircle className="icon text-gray-400 hover:text-blue-500" size={24} />
          </div>
        </header>

        <hr />
        {page === 0 && (
          <div className="flex justify-left ">
            <Card
              shadow="xl"
              padding="xl"
              style={{
                width: "100%",
                maxWidth: 600,
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            >
              <Text
                align="center"
                weight={600}
                size="xl"
                style={{ marginBottom: "16px", fontSize: "1.25rem" }}
              >
                Start Sales Analysis
              </Text>
              <Text
                align="center"
                size="sm"
                style={{ marginBottom: "20px", color: "#6b6b6b" }}
              >
                Upload the following Excel files to start processing.
              </Text>

              <div className="file-upload-container mb-4">
                <label htmlFor="file1" className="block mb-2 text-sm font-medium">
                  Upload Communication Log:
                </label>
                <FileInput
                  id="file1"
                  value={file1}
                  onChange={(file) => handleFileChange(file, setFile1)}
                  accept=".xlsx,.xls"
                  className="w-full"
                  placeholder="Choose file"
                />
              </div>

              <div className="file-upload-container mb-4">
                <label htmlFor="file2" className="block mb-2 text-sm font-medium">
                  Upload Lead Details:
                </label>
                <FileInput
                  id="file2"
                  value={file2}
                  onChange={(file) => handleFileChange(file, setFile2)}
                  accept=".xlsx,.xls"
                  className="w-full"
                  placeholder="Choose file"
                />
              </div>

              <Button fullWidth variant="filled" color="blue" onClick={handleSubmit}>
                Start Analysis
              </Button>
            </Card>
          </div>
        )}
        {
          page === 1 && (
            <div className="flex justify-left ">
              <Card
                shadow="xl"
                padding="xl"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                }}
              >
                <Text
                  align="center"
                  weight={600}
                  size="xl"
                  style={{ marginBottom: "16px", fontSize: "1.25rem" }}
                >
                  Sample Files
                </Text>
                <Text
                  align="center"
                  size="sm"
                  style={{ marginBottom: "20px", color: "#6b6b6b" }}
                >
                  You can download Sample Files from here
                </Text>
                <div>

                </div>
                <div className="flex justify-between items-center mt-5 gap-[10px]">
                  <div className="border-[1px] pt-[5px] pb-[5px] pl-[10px] pr-[10px] w-[100%] rounded-[5px]">
                    Communication Log Sample
                  </div>
                  <Button className="!w-[200px]" rightSection={<FaDownload size={14} />}>Download</Button>
                </div>
                <div className="flex justify-between items-center mt-5 gap-[10px]">
                  <div className="border-[1px] pt-[5px] pb-[5px] pl-[10px] pr-[10px] w-[100%] rounded-[5px]">
                    Leads Details Sample
                  </div>
                  <Button className="!w-[200px]" rightSection={<FaDownload size={14} />}>Download</Button>
                </div>
              </Card>
            </div>
          )
        }
      </div>
    </main>
  );
}
