import { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import CloudSVG from "../assets/cloud.svg";
import DeviceSVG from "../assets/device.svg";
import Logo from "../assets/logo.svg";
import CrossAction from "../assets/crossAction.svg";
import RightAction from "../assets/rightAction.svg";
import Filters from "./common/Filters";
import Search from "./common/Search";

function CameraList() {
  const [cameraList, setCameraList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  async function CameraItems() {
    setLoading(true);
    try {
      const token = "4ApVMIn5sTxeW7GQ5VWeWiy";
      const apiResponse = await fetch(
        "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await apiResponse.json();
      setCameraList(result.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    CameraItems();
  }, []);
  // Calculate total items and pages
  const totalItems = cameraList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate current page items
  const currentItems = cameraList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination Handlers
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handleLast = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div>
      <div className={Styles.logoContainer}>
        <img src={Logo} alt="Logo" />
      </div>

      <div className={Styles.header_container}>
        <div>
          <p className={Styles.main_heading}>Cameras</p>
          <p className={Styles.sub_heading}>Manage your cameras here.</p>
        </div>

        <Search />
      </div>

      <div className={Styles.CameraListContainer}>
        <div className={Styles.list_container}>
          <Filters cameraList={cameraList} />
        </div>
        <div className={Styles.list_container}>
          <input type="checkbox" />
          <p>Name</p>
          <p>HEALTH</p>
          <p>LOCATION</p>
          <p>RECORDER</p>
          <p>TASKS</p>
          <p>STATUS</p>
          <p>ACTIONS</p>
        </div>

        {currentItems.map((item, index) => (
          <div key={index} className={Styles.list_container}>
            <input type="checkbox" />

            <p>
              <span
                className={`${Styles.status_dot} ${
                  item.current_status === "Online"
                    ? Styles.online
                    : Styles.offline
                }`}
              ></span>
              {item.name}
            </p>
            <div className={Styles.healthWrapper}>
              <div className={Styles.healthItem}>
                <img src={CloudSVG} alt="CloudSVG" className={Styles.icon} />
                <div
                  className={`${Styles.circle_progress} ${
                    item.health.cloud === "A"
                      ? Styles.green_progress
                      : Styles.orange_progress
                  }`}
                >
                  <span className={Styles.progress_text}>
                    {item.health.cloud}
                  </span>
                </div>
              </div>
              <div className={Styles.healthItem}>
                <img src={DeviceSVG} alt="DeviceSVG" className={Styles.icon} />
                <div
                  className={`${Styles.circle_progress} ${
                    item.health.device === "A"
                      ? Styles.green_progress
                      : Styles.orange_progress
                  }`}
                >
                  <span className={Styles.progress_text}>
                    {item.health.device}
                  </span>
                </div>
              </div>
            </div>
            <p>{item.location}</p>
            <p>{item.recorder}</p>
            <p>{item.tasks}</p>
            <p>
              <span
                className={`${Styles.status} ${
                  item.status === "Active"
                    ? Styles.status_active
                    : Styles.status_inactive
                }`}
              >
                {item.status}
              </span>
            </p>
            <p>
              <img
                src={item.status === "Active" ? CrossAction : RightAction}
                alt="action"
              />
            </p>
          </div>
        ))}
        <div className={Styles.paginationContainer}>
          <span className={Styles.pagination_text}>
            {currentPage} - {currentPage * 10} of {cameraList.length}
          </span>
          <button onClick={handleFirst} disabled={currentPage === 1}>
            &#171; {/* Unicode for double left arrow */}
          </button>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            &lt; {/* Unicode for single left arrow */}
          </button>

          <button onClick={handleNext} disabled={currentPage === totalPages}>
            &gt; {/* Unicode for single right arrow */}
          </button>
          <button onClick={handleLast} disabled={currentPage === totalPages}>
            &#187; {/* Unicode for double right arrow */}
          </button>
        </div>
      </div>

      {/* Pagination Controls */}
    </div>
  );
}

export default CameraList;
