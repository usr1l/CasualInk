# CasualInk
CasualInk is a clone of Artsy, a website that provides a platform for people to list artwork for sale/auction. Visitors can view, bid on, and buy artwork that they like. CasualInk is built on a Python backend and connected to a PostgreSQL database. Websockets are utilized in order to perform bidding and updates for all users in real time.

In order to run this in local environment, clone the repo, and run ```pipenv install``` in the root directory, and ```npm install``` in the "react-app" directory.
To start the backend, run ```pipenv shell```, and then ```flask run```. To reseed the database, while inside the virtual environment, run ```flask seed undo``` and ```flask seed all```.
To start the frontend, run ```npm start``` within the "react-app" directory.

![This is an image](./README/static/homepage-casualink.gif)


Link to Live Site: https://casualink.onrender.com/

Link to GitHub Repo: https://github.com/usr1l/CasualInk

## Highlights

### Auction Bidding Component
```
// initiate socket outside component
let socket;

const AuctionBidInput = ({ auctionListing, userBool }) => {
  const dispatch = useDispatch();

  const {
    current_bid,
    start_bid
  } = auctionListing;

  const minBid = () => {
    if (current_bid === "0") return (Math.ceil(parseFloat(start_bid) * 1.05));
    return Math.ceil(parseFloat(current_bid * 1.05));
  };

  const [ bidError, setBidError ] = useState("");
  const [ newBidPrice, setNewBidPrice ] = useState(minBid());

  const validateBidPrice = () => {
    let bidError = "";
    if ((newBidPrice && parseFloat(newBidPrice) < 0) ||
      (!Number.isInteger(parseFloat(newBidPrice))) ||
      ((current_bid ? current_bid : start_bid) * 1.05 > newBidPrice)
    ) bidError = "Bid value must be 5% greater than the current bid. (Rounded to dollar)";

    return bidError;
  };

  const sendBidData = (newBidPrice) => {
    socket.emit("auction_bid", { "current_bid": newBidPrice });
  };

  // function for creating a new bid
  const thunkCreateBid = (newBidPrice) => async (dispatch) => {
    const res = await fetch(`/api/auctionlistings/${auctionListing.id}/bid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "current_bid": newBidPrice })
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(actionEditAuctionListing(data));
      setBidError("");
    };

    return data;
  };

  const handleBid = (e) => {
    e.preventDefault();
    const bidError = validateBidPrice();
    if (bidError) return setBidError(bidError);

    sendBidData(Math.ceil(parseFloat(newBidPrice)));
  };

  useEffect(() => {
    setNewBidPrice(minBid());
  }, [ current_bid ]);

  useEffect(() => {
    // production environment safe guard for connect address
    if (process.env.REACT_APP_ENV === "production") socket = io.connect('https://casualink.onrender.com/');
    else socket = io.connect('http://localhost:5000/');

    socket.on("update_bid", (current_bid) => {
      dispatch(thunkCreateBid(current_bid));
    });

    return (() => {
      socket.disconnect()
    })
  }, []);

  return (
    <>
      {userBool ? (
        <>
          <InputDiv
            labelStyle={'__label'}
            error={bidError}
            label={'Enter Bid: *'}
          >
            <input
              className='__input'
              type="number"
              value={newBidPrice}
              onChange={(e) => setNewBidPrice(e.target.value)}
              required
            />
          </InputDiv>
          <Button
            buttonSize={'btn--wide'}
            buttonStyle={'btn--demo'}
            onClick={handleBid}
          >
            Submit Bid
          </Button>
        </>
      ) : (
        <Button disableButton={true}>
          Auction is currently live.
        </Button>
      )}
    </>
  );
};


export default AuctionBidInput;

```

## Technologies Used

### Languages

- JavaScript
- HTML
- CSS
- DBML
- Python

### Frameworks
- React
- Flask

### Libraries
- Redux
- SQLAlchemy

### Databases
- SQLite3
- SQLAlchemy

### Tools
- Postman
- GitHub
- Visual Studio Code
- Redux Developer Tools

## Features

### Art Pieces
Browse and explore
![This is an image](./README/static/auctionitem.gif)

### Shopping Cart
![This is an image](./README/static/shopcart.PNG)

### Reviews
![This is an image](./README/static/reviews.gif)

### Live Bidding
![This is an image](./README/static/bid.gif)

## Components
- Art Display Card
- Art Showcase Card/Display Card
- Auction Bid Input
- Button
- Confirm Modal
- Content Card
- Countdown Timer
- Feature Banner
- Horizontal Showcase
- Icon Label
- Image Card
- Image Preview
- Input Div
- NavBar
- Open Modal Button
- Page Container
- Page Split
- Profile Description Card

## Database Design
![This is an image](./README/static/database.png)

## Link to Preparation Docs
https://github.com/usr1l/CasualInk/wiki
