import { Card } from "./ui/card";
import moment from "moment";

function IsSender({ msg, sender }) {
  return (
    <>
      <div className="p-7">
        <div className="flex space-x-2 p-auto m-auto flex-row-reverse">
          <Card className="space-y- p-5">
            <p className="text-sm break-words w-[200px]">
              {msg.content ? msg.content : "loading"}
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                {moment(msg.createdAt).calendar()}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default IsSender;
