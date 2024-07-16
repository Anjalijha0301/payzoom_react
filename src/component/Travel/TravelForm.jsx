import React from "react";
import FlightTab from "./FlightTab";

const TravelForm = () => {
  return (
    <div className="search-engine">
      <div className="container">
        {/* search engine tabs */}
        <div className="row mt-0">
          <div className="col-12 col-lg-10 offset-lg-1 mb-5 text-center position-relative">
            {/* ---------------------------------- */}
            {/* product main tab list */}
            {/* ---------------------------------- */}
            <TraveltabList />
            {/* ---------------------------------- */}
            {/* product main tab list end------------------------*/}
            {/* ---------------------------------- */}

            {/* product main tab content */}
            <div className="tab-content mt-3" id="myTabContent">
              {/* flight search tab */}
              <FlightTab />

              {/* hotel search tab */}
              {/* <HotelTab /> */}

              {/* holiday search tab */}
              {/* <HolidaySearchTab /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelForm;

// flight tablist component
function TraveltabList() {
  return (
    <ul
      className="nav nav-tabs d-flex justify-content-center border-0 cust-tab"
      id="myTab"
      role="tablist"
    >
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="flight-tab"
          data-bs-toggle="tab"
          data-bs-target="#flight-tab-pane"
          type="button"
          role="tab"
          aria-controls="flight-tab-pane"
          aria-selected="true"
        >
          Flights
        </button>
      </li>
      {/* <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="hotel-tab"
          data-bs-toggle="tab"
          data-bs-target="#hotel-tab-pane"
          type="button"
          role="tab"
          aria-controls="hotel-tab-pane"
          aria-selected="false"
        >
          Hotel
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="holiday-tab"
          data-bs-toggle="tab"
          data-bs-target="#holiday-tab-pane"
          type="button"
          role="tab"
          aria-controls="holiday-tab-pane"
          aria-selected="false"
        >
          Holidays
        </button>
      </li> */}
    </ul>
  );
}
