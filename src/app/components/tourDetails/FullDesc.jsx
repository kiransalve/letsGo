"use client";
import React, { useState } from "react";

const FullDesc = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="flex gap-10 my-4">
        <div className="text-sm font-bold text-gray-600">Full description</div>
        <div className="text-sm font-semibold text-gray-600">
          {showMore
            ? ""
            : "Experience the chapters of Charleston&apos;s history on a guided walking tour and explore the cobblestone streets of the only English"}
          {showMore && (
            <p onClick={() => setShowMore(!showMore)}>
              Experience the chapters of Charleston&apos;s history on a guided
              walking tour and explore the cobblestone streets of the only
              English, walled city in North America. Glimpse into the
              city&apos;s complicated past, from its colonial roots to many
              natural disasters.
              <br />
              <br />
              Meet your guide, Al Ray, and set off on a sightseeing walk in the
              beautiful walled city of Charleston. Stroll along the cobblestone
              streets, lined with colorful pre- and post-colonial homes,
              storefronts, churches, and public buildings.
              <br />
              <br />
              Get swept up in Charleston&apos;s fascinating and turbulent
              history as Ray gives meaning to each stop with insider tales and
              legends. Read the ancient symbols on the tombstones and relive the
              phases of the city&apos;s history, from rapid growth and the age
              of piracy to the rise of the rice planters.
              <br />
              <br />
              Learn about the numerous disasters that have made their mark on
              Charleston, including seven major fires, hurricanes, epidemics,
              sieges, and bombardments, plus a devastating earthquake. Come away
              with a new understanding of Charleston and the people and events
              that shaped it
            </p>
          )}{" "}
          <button
            className="text-blue-500 underline cursor-pointer"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default FullDesc;
