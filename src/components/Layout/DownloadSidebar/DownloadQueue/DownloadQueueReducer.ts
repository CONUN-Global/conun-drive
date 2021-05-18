import { produce } from "immer";

type Status = "IN_PROGRESS" | "FINISHED" | "CANCELLED";

type QueueFile = {
  id: string;
  name: string;
  status: Status;
  fileName: string;
  data: any;
};

type Action =
  | { type: "ADD_DOWNLOAD"; payload: QueueFile }
  | { type: "REMOVE_DOWNLOAD"; payload: string }
  | { type: "SET_DOWNLOAD_DATA"; payload: { id: string; data: any } };

interface State {
  downloads: { [key: string]: QueueFile } | {};
}

// to prevent the auto sorting in objects
const ID_LABEL = "id";

const reducer = produce(
  (draft: State, action: Action) => {
    switch (action.type) {
      case "ADD_DOWNLOAD":
        draft.downloads = {
          ...draft.downloads,
          [ID_LABEL + action.payload.id]: action?.payload,
        };

        break;

      case "REMOVE_DOWNLOAD": {
        const newDownloads = draft?.downloads;
        delete newDownloads[action?.payload];
        draft.downloads = newDownloads;
        break;
      }

      case "SET_DOWNLOAD_DATA":
        draft.downloads[ID_LABEL + action?.payload?.id].status = "FINISHED";
        draft.downloads[ID_LABEL + action?.payload?.id].data =
          action?.payload?.data;
        break;

      default: {
        throw new Error("Unhandled action");
      }
    }
  },
  { downloads: {} }
);

export default reducer;
