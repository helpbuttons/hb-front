///button marker over the map
import React from "react";
import { map } from "rxjs/operators";
import { useState } from "react";

import { Marker, Popup } from "react-leaflet";
import { iconButton } from "./IconButton";
import CardButtonMap from "components/map/CardButtonMap";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export function MarkerButton({ position, imageUrl, children }) {
  if (imageUrl) {
    imageUrl = baseUrl + "/files/get/" + imageUrl;
  } else {
    imageUrl = "https://dummyimage.com/200/#ccc/fff";
  }
  return (
    <Marker
      position={
        position
          ? {
              lat: position.coordinates[0],
              lng: position.coordinates[1],
            }
          : { lat: null, lng: null }
      }
      icon={iconButton(imageUrl)}
    >
      {children}
    </Marker>
  );
}
export function MarkersButton({ buttons, ...props }) {
  let buttonArray = buttons.length > 0 ? buttons[0] : buttons;

  const markers = buttonArray.map((button, i) => (
    <MarkerButton position={button.location} imageUrl={button.images[0]} key={i}>
      <Popup className="card-button-map--wrapper">
        <CardButtonMap
          key={button.id}
          type={button.type}
          userName={button.owner}
          images={button.images}
          buttonName={button.name}
          tags={button.tags}
          description={button.description}
          date={button.date}
          location={button.location}
        />
      </Popup>
    </MarkerButton>
  ));

  return markers;
}
