import { useState } from "react";
import { useUser } from "../../contexts/userContext";
import MapModal from "../common/MapModal";
import OrdersTable from "../common/OrdersTable";
import liv from "../../assets/images/help.jpg";

const ClientOrders = () => {
  const [mapOpen, setMapOpen] = useState(false);
  const [orderToTrack, setOrderToTrack] = useState(null);
  const { commands } = useUser();
  const handleMapToggle = (id = null) => {
    console.log(id);
    if (id != orderToTrack) {
      setOrderToTrack(id);
      setMapOpen(true);
    } else {
      setOrderToTrack(null);
      setMapOpen(false);
    }
  };
  return (
    <div className="relative w-full h-full">
      <img src={liv} className="absolute top-0 left-0 w-full h-full z-[-1]" />

      {commands.length == 0 && (
        <div className="p-12 text-center text-lg font-bold text-brand flex flex-col gap-4">
          <span className="text-2xl font-extrabold">Ops !!</span> You have made
          no Orders
          <button className="bg-brand w-w-max-content p-12 py-3 rounded-xl m-auto text-white hover:scale-105 transition-all">
            Make Orders
          </button>
        </div>
      )}
      {commands.length != 0 && mapOpen && (
        <MapModal
          open={mapOpen}
          orderToTrack={orderToTrack}
          setMapOpen={setMapOpen}
        />
      )}
      {commands.length != 0 && (
        <OrdersTable
          role={"client"}
          orders={commands}
          toggleMap={handleMapToggle}
        />
      )}
    </div>
  );
};

export default ClientOrders;
