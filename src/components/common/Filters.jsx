import React, { useState } from "react";
import Styles from "./Filters.module.css";
import LocationSVG from "../../assets/location.svg";
import ArrowSVG from "../../assets/arrow.svg";
import StatusSVG from "../../assets/status.svg";

function Filters({ cameraList }) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const toggleLocationDropdown = () => setIsLocationOpen((prev) => !prev);
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);

  const handleLocationSelection = (location) => {
    setSelectedLocation(location);
    setIsLocationOpen(false);
  };

  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
    setIsStatusOpen(false);
  };

  const uniqueLocations = [...new Set(cameraList.map((item) => item.location))];
  const uniqueStatuses = [...new Set(cameraList.map((item) => item.status))];

  return (
    <div className={Styles.container}>
      <div className={Styles.dropdownWrapper}>
        <div className={Styles.dropdownHeader} onClick={toggleLocationDropdown}>
          {selectedLocation ? (
            <p>{selectedLocation}</p>
          ) : (
            <div className={Styles.placeholder}>
              <img src={LocationSVG} alt="location" className={Styles.icon} />
              <p>Location</p>
              <img
                src={ArrowSVG}
                alt="arrow"
                className={`${Styles.shiftRight} ${Styles.icon}`}
              />
            </div>
          )}
        </div>
        {isLocationOpen && (
          <ul className={Styles.dropdownList}>
            {uniqueLocations.map((location, index) => (
              <li
                key={index}
                className={Styles.dropdownItem}
                onClick={() => handleLocationSelection(location)}
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={Styles.dropdownWrapper}>
        <div className={Styles.dropdownHeader} onClick={toggleStatusDropdown}>
          {selectedStatus ? (
            <p>{selectedStatus}</p>
          ) : (
            <div className={Styles.placeholder}>
              <img src={StatusSVG} alt="status" className={Styles.icon} />
              <p>Status</p>
              <img
                src={ArrowSVG}
                alt="arrow"
                className={`${Styles.shiftRight} ${Styles.icon}`}
              />
            </div>
          )}
        </div>
        {isStatusOpen && (
          <ul className={Styles.dropdownList}>
            {uniqueStatuses.map((status, index) => (
              <li
                key={index}
                className={Styles.dropdownItem}
                onClick={() => handleStatusSelection(status)}
              >
                {status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Filters;
