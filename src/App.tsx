// import { SimplePost } from "./components/Simple/SimplePost";
// import UseArrayExample from "./components/Hooks/UseArrayExample";
// import { PostWithComment } from "./components/UserInteraction/PostWithComments";
import { ShoppingList2 } from "./components/Errors/ShoppingList2";

function App() {
  return (
    <>
      <ShoppingList2
        groceries={["Apples", "Bananas", "Ham", "Bread", "Bread"]}
        selectItem={() => {
          //
        }}
      />
    </>
  );
}

export default App;
