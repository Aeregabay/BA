import { Card, Image, Icon } from "semantic-ui-react";
import Router from "../routes";

//push to desired item id
function pushRoute(id) {
  Router.pushRoute("item", { id: id });
}

//truncate description to fit in Card
function truncate(text) {
  if (text.length > 100) {
    return text.substring(0, 97) + "...";
  } else {
    return text;
  }
}

//only display 2 lines of tags
function truncateTags(tags) {
  let maxLength;
  let string = "";
  for (let i = 0; i < tags.length; i++) {
    if (string.length + tags[i].length < 85) {
      string += tags[i];
    } else {
      maxLength = i;
      tags[maxLength - 1] = tags[maxLength - 1].replace("|", "");
      break;
    }
  }

  return tags.slice(0, maxLength);
}

export function renderObjects(objects, tagsIn, picturesIn) {
  if (objects) {
    //array to return after all 10 items are constructed
    let finalObjects = [];

    //this whole following process has to be done for all objects
    //that were initially fetched
    for (let i = 0; i < objects.length; i++) {
      let uniqueKey = "Card" + i;

      //arrays to be filled with only necessary information
      let tags = [];
      let pics = [];
      //variables to make further code easier to read
      let title = objects[i].title;
      let description = objects[i].description;
      let id = objects[i].id;
      let owner = objects[i].owner;
      let price = objects[i].price;
      let category = objects[i].category;

      //for each object, write all the tags that correspond to it
      //from the tags array to this new array
      for (let i = 0; i < tagsIn.length; i++) {
        if (tagsIn[i].corresp_obj_id === id) {
          tags.push(tagsIn[i].content + " | ");
        }
      }

      //for each object, write all the pics that correspond to it
      //from the pics array to this new array
      for (let i = 0; i < picturesIn.length; i++) {
        if (picturesIn[i].corresp_obj_id == id) {
          pics.push(picturesIn[i].name);
        }
      }
      //remove the vertical divider from the last tag for nicer display
      if (tags.length > 0) {
        tags[tags.length - 1] = tags[tags.length - 1].replace("|", "");
      }

      //create img source
      let imgSrc = "../static/" + pics[0];

      //create the actual JSX objects and push to array that is returned
      finalObjects.push(
        <div
          key={uniqueKey}
          style={{ marginBottom: "30px", marginRight: "30px" }}
        >
          <Card raised link style={{ height: "550px", width: "300px" }}>
            <div
              style={{
                height: "300px"
              }}
            >
              <Image
                src={imgSrc}
                style={{
                  maxHeight: "300px",
                  maxWidth: "300px",
                  borderRadius: "2px",
                  margin: "auto"
                }}
                value={id}
                onClick={() => {
                  pushRoute(id);
                }}
              />
            </div>
            <Card.Content href={`item/${id}`}>
              <Card.Header style={{ color: "#7a7a52" }}>{title}</Card.Header>
              <Card.Meta style={{ color: "#adad85" }}>{price}</Card.Meta>
              <Card.Description>
                <span
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    color: "#ccccb3"
                  }}
                >
                  {truncate(description)}
                </span>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user secret" style={{ color: "#7a7a52" }} />
                <span style={{ color: "#ccccb3" }}>{owner}</span>
              </a>
              <p />
              <a>
                <Icon name="filter" style={{ color: "#7a7a52" }} />
                <span style={{ color: "#ccccb3" }}>{category}</span>
              </a>
              <p />
              <a>
                <Icon name="tags" style={{ color: "#7a7a52" }} />
                <span style={{ color: "#ccccb3" }}>{truncateTags(tags)}</span>
              </a>
            </Card.Content>
          </Card>
        </div>
      );
    }

    return finalObjects;
  }
}
