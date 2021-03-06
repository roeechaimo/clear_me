import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import styled from 'styled-components';
import BackButton from '../../components/backButton/BackButton';
import ErrorText from '../../components/errorText/ErrorText';
import Loader from '../../components/loader/Loader';
import PageWrapper from '../../components/pageWrapper/PageWrapper';
import useOrganizations from '../../hooks/useOrganizations';
import Services from '../../services/Services';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const usCenter = [-98.5795, 39.828175];

const services = new Services();
const apiService = services.api;
const validations = services.validations;

const Wrapper = styled.div`
  width: 75%;
`;

const MarkerText = styled.text`
  font-size: 2px;
`;

const ERROR_SPAN = { fontSize: '10px' };

export default function Map() {
  const [coordinates, setCoordinates] = useState({
    valid: [],
    invalid: [],
    isLoaded: false,
  });

  const {
    isLoading: isLoadingOrganizations,
    isFetching: isFetchingOrganizations,
    error: errorOrganizations,
    data: organizations,
  } = useOrganizations();

  const getOrganizationsCoordinates = () => {
    let locations = [];
    let invalid = [];
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
        isLoaded: true,
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

        <MarkerText textAnchor="middle">{marker?.name}</MarkerText>
      </Marker>
    );
  };

  const renderInvalidOrg = (organization, index) => {
    return (
      <ErrorText
        key={organization?.id || index}
        text={`${organization?.name}${coordinates?.invalid?.length - 1 === index ? '' : ', '}`}
        style={ERROR_SPAN}
      />
    );
  };

  useEffect(() => {
    getOrganizationsCoordinates();

    return () => {};
  }, [organizations]);

  return (
    <PageWrapper>
      <BackButton />

      <h3>Map</h3>

      {!coordinates?.isLoaded ? (
        <Loader />
      ) : (
        <>
          {!!coordinates?.invalid?.length && (
            <Wrapper>
              <ErrorText isParagragh={true} text={"Couldn't find location for:"} />

              {coordinates?.invalid?.map((org, index) => renderInvalidOrg(org, index))}
            </Wrapper>
          )}

          <Wrapper>
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
          </Wrapper>
        </>
      )}
    </PageWrapper>
  );
}
