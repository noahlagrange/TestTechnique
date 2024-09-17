import { gql } from "@apollo/client";

export const GET_REPORT = gql`
query FindAllbyDeviceId($deviceId: String!) {
  FindAllbyDeviceId(deviceId: $deviceId) {
    temperature
    date
    deviceId
  }
}
`;

export const GET_ITEMS = gql`
  query {
    items {
      id
      name
      description
    }
  }
`;

export const LATEST_REPORTS_QUERY = gql`
  query LatestReportsByDeviceIds($deviceIds: [String!]!) {
    latestReportsByDeviceIds(deviceIds: $deviceIds) {
      temperature
      deviceId
      date
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($id: String!) {
    item(id: $id) {
      name
      description
    }
  }
`;