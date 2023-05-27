import { ethers } from "ethers";
const Buy = ({ state }) => {
  const buyLand = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const phoneNumber = document.querySelector("#phoneNumber").value;
    const LandName = document.querySelector("#LandName").value;
    console.log(name, phoneNumber,LandName, contract);
    const amount = { value: ethers.utils.parseEther("0.001") };
    const transaction = await contract.buyLand(name, phoneNumber,LandName, amount);
    await transaction.wait();
    console.log("Transaction is done");
  };
  return (
    <>
    <div>
        <h1>DECENTRALIZED LAND REGISTRY</h1>
    </div>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyLand}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">phoneNumber</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder="Enter Your Message"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">LandName</label>
            <input
              type="text"
              className="form-control"
              id="LandName"
              placeholder="Enter YourLandName"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>
      </div>
     
    </>
  );
};
export default Buy;