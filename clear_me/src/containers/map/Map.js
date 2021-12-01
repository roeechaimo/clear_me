import { useContext, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import BackButton from '../../components/backButton/BackButton';
import { AppContext } from '../../contexts/AppContext';
import Services from '../../services/Services';
import './Map.css';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const usCenter = [-98.5795, 39.828175];

const services = new Services();
const apiService = services.api;
const validations = services.validations;

export default function Map() {
  const appContext = useContext(AppContext);
  const [coordinates, setCoordinates] = useState({
    valid: [],
    invalid: [],
  });

  const getOrganizationsCoordinates = () => {
    let locations = [];
    let invalid = [];
    const organizations = appContext?.appState?.data?.organizations;
    organizations?.forEach((org) => {
      if (org?.city && org?.state && org?.address_1) {
        let location = { city: org?.city, state: org?.state, address: org?.address_1 };
        const isValid = validations.validateZipCode(org?.zip_code);
        if (isValid) {
          location = { ...location, zipCode: org?.zip_code };
        }

        locations.push(location);
      } else {
        invalid.push(org);
      }
    });

    apiService?.getZipCodes({ locations })?.then((response) => {
      const { invalidLocations, validOrganizations } = filterLocations(response?.results, organizations);

      setCoordinates({
        valid: validOrganizations,
        invalid: [...invalidLocations, ...invalid],
      });
    });
  };

  const filterLocations = (results, organizations) => {
    let validOrganizations = [];
    let invalidLocations = [];
    results?.forEach((location) => {
      const organization = organizations?.find(
        (org) => org?.city === location?.providedLocation?.city && org?.state === location?.providedLocation?.state
      );
      if (location?.locations?.length === 1) {
        const locationArr = [location?.locations[0]?.latLng?.lng, location?.locations[0]?.latLng?.lat];
        validOrganizations = [...validOrganizations, { ...organization, locationArr }];
      } else {
        if (organization) {
          invalidLocations = [...invalidLocations, organization];
        }
      }
    });

    return { invalidLocations, validOrganizations };
  };

  const renderMarker = (marker, index) => {
    return (
      <Marker key={index} coordinates={marker?.locationArr}>
        <g>
          <circle r={2} fill="#89CFF0" cy="3" />
        </g>

        <text textAnchor="middle">{marker?.name}</text>
      </Marker>
    );
  };

  const renderInvalidOrg = (organization, index) => {
    return (
      <span key={organization?.id || index} className="error">{`${organization?.name}${
        coordinates?.invalid?.length - 1 === index ? '' : ', '
      }`}</span>
    );
  };

  useEffect(() => {
    getOrganizationsCoordinates();

    return () => {};
  }, [appContext?.appState?.data?.organizations]);

  return (
    <main>
      <BackButton />

      <h3>Map</h3>

      {!!coordinates?.invalid?.length && (
        <div className="invalid-locations-wrapper">
          <p className="error">Couldn't find location for:</p>

          {coordinates?.invalid?.map((org, index) => renderInvalidOrg(org, index))}
        </div>
      )}

      <div className="map-wrapper">
        <ComposableMap>
          <ZoomableGroup center={usCenter} zoom={3}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF" />)
              }
            </Geographies>

            {coordinates?.valid?.map((item, index) => renderMarker(item, index))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </main>
  );
}
