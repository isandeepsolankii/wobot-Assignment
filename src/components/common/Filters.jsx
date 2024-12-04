import styles from "./Filters.module.css"; // Import your CSS module file
import React, { useState } from "react";
import LocationSVG from "../../assets/location.svg";
import ArrowSVG from "../../assets/arrow.svg";
import StatusSVG from "../../assets/status.svg";

function Filters({ cameraList }) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(""); // To track the selected location
  const [selectedStatus, setSelectedStatus] = useState(""); // To track the selected status

  const toggleLocationDropdown = () => setIsLocationOpen((prev) => !prev);
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);

  const handleLocationSelection = (item) => {
    setSelectedLocation(item.location);
    setIsLocationOpen(false);
  };

  const handleStatusSelection = (item) => {
    setSelectedStatus(item.status);
    setIsStatusOpen(false);
  };

  // Remove duplicates from cameraList for locations
  const uniqueLocations = [...new Set(cameraList.map((item) => item.location))];

  // Remove duplicates from cameraList for status (if needed)
  const uniqueStatuses = [...new Set(cameraList.map((item) => item.status))];

  return (
    <div className={styles.container}>
      {/* Location Dropdown */}
      <div className={styles.dropdownWrapper}>
        <div className={styles.dropdownHeader} onClick={toggleLocationDropdown}>
          {selectedLocation ? (
            <p>{selectedLocation}</p>
          ) : (
            <div className={styles.placeholder}>
              <img src={LocationSVG} alt="location" className={styles.icon} />
              <p>Location</p>
              <img
                src={ArrowSVG}
                alt="arrow"
                className={`${styles.shiftRight} ${styles.icon}`}
              />
            </div>
          )}
        </div>
        {isLocationOpen && (
          <ul className={styles.dropdownList}>
            {uniqueLocations.map((location, index) => (
              <li
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleLocationSelection({ location })}
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Status Dropdown */}
      <div className={styles.dropdownWrapper}>
        <div className={styles.dropdownHeader} onClick={toggleStatusDropdown}>
          {selectedStatus ? (
            <p>{selectedStatus}</p>
          ) : (
            <div className={styles.placeholder}>
              <img src={StatusSVG} alt="status" className={styles.icon} />
              <p>Status</p>
              <img
                src={ArrowSVG}
                alt="arrow"
                className={`${styles.shiftRight} ${styles.icon}`}
              />
            </div>
          )}
        </div>
        {isStatusOpen && (
          <ul className={styles.dropdownList}>
            {uniqueStatuses.map((status, index) => (
              <li
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleStatusSelection({ status })}
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
