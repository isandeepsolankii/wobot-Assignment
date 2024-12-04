import { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import CloudSVG from "../assets/cloud.svg";
import DeviceSVG from "../assets/device.svg";
import Logo from "../assets/logo.svg";
import CrossAction from "../assets/crossAction.svg";
import RightAction from "../assets/rightAction.svg";
import Filters from "./common/Filters";

function CameraList() {
  const [cameraList, setCameraList] = useState([]);

  const [loading, setLoading] = useState(false);

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
  });

  console.log(cameraList);

  return (
    <div>
      <div className={Styles.logoContainer}>
        <img src={Logo} alt="Logo" />
      </div>
      <h3>Camera list</h3>

      <div className={Styles.CameraListContainer}>
        <div>
          <Filters cameraList={cameraList} />
        </div>
        <table className={Styles.camera_table}>
          <thead className={Styles.tableHeading}>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>NAME</th>
              <th>HEALTH</th>
              <th>LOCATION</th>
              <th>RECORDER</th>
              <th>TASKS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {cameraList.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <span
                    className={`${Styles.status_dot} ${
                      item.current_status === "Online"
                        ? Styles.online
                        : Styles.offline
                    }`}
                  ></span>

                  {item.name}
                </td>
                <td>
                  <div className={Styles.healthWrapper}>
                    <div className={Styles.healthItem}>
                      <img
                        src={CloudSVG}
                        alt="CloudSVG"
                        className={Styles.icon}
                      />
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
                      <img
                        src={DeviceSVG}
                        alt="DeviceSVG"
                        className={Styles.icon}
                      />
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
                </td>

                <td>{item.location}</td>
                <td>{item.recorder}</td>
                <td>{item.tasks}</td>
                <td>
                  <span
                    className={`${Styles.status} ${
                      item.status === "Active"
                        ? Styles.status_active
                        : Styles.status_inactive
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <img
                    src={item.status === "Active" ? CrossAction : RightAction}
                    alt="action"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CameraList;
