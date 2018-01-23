const SET = 'nav/SET';
const SET_TIT = 'nav/SET_TIT';
const UPD_IND = 'nav/UPD_IND';

const initState = {
  location: '',
  mockupnav: {
    titles: ['front'],
    views: [0],
    index: 0,
    length: 1
  }
}

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {
    case SET:
      editState.location = action.payload;
      return Object.assign({}, state, editState);
    case SET_TIT:
      var newViews = [], newTitles = [], newIndex, count = 0;
      action.titles.forEach((title, i) => {
        if (title.display) {
          var text = title.text;
          title.text === "leftSleeve" ? text = "left sleeve" : title.text;
          title.text === "rightSleeve" ? text = "right sleeve" : title.text;
          newTitles.push(text);
          if (title.text === action.changed) {
            newIndex = count;
          }
          count++;
        }
      });
      action.titles[0].display ? newViews.push(0) : null;
      action.titles[1].display ? newViews.push(1) : null;
      action.titles[2].display ? newViews.push(2) : null;
      action.titles[3].display ? newViews.push(3) : null;
      action.titles[4].display ? newViews.push(4) : null;
      editState.mockupnav.titles = newTitles;
      editState.mockupnav.views = newViews;
      editState.mockupnav.length = newViews.length;
      if (editState.mockupnav.index >= newViews.length) {
        editState.mockupnav.index--;
        document.getElementById("view-container").style.marginLeft = (newViews.length - 1) * (1 - 326) + "px";
      }
      if (action.adding) {
        editState.mockupnav.index = newIndex;
        document.getElementById("view-container").style.marginLeft = newIndex * (1 - 326) + "px";
      }
      return Object.assign({}, state, editState);
    case UPD_IND:
      editState.mockupnav.index = action.payload;
      return Object.assign({}, state, editState);
    default: return state;
  }
}

export function setLocation(location) {
  return {
    type: SET,
    payload: location
  }
}

export function setTitles(titles, adding, changed) {
  return {
    type: SET_TIT,
    titles: titles,
    adding: adding,
    changed: changed
  }
}

export function updateViewIndex(index) {
  return {
    type: UPD_IND,
    payload: index
  }
}
