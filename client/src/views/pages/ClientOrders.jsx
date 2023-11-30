import { useState } from "react";
import { useUser } from "../../contexts/userContext";
import MapModal from "../common/MapModal";
import OrdersTable from "../common/OrdersTable";

const ClientOrders = () => {
  const [mapOpen, setMapOpen] = useState(false);
  const { commands } = useUser();
  const handleMapToggle = () => {
    if(mapOpen) setMapOpen(false) 
    else setMapOpen(true)
  }
  return (
    <div>
      {commands.length == 0 && (<div className="p-12 text-center text-lg font-bold text-brand flex flex-col gap-4">
       <span className="text-2xl font-extrabold">Ops !!</span> You have made no Orders
       <button className="bg-brand w-w-max-content p-12 py-3 rounded-xl m-auto text-white hover:scale-105 transition-all">Make Orders</button>
        </div>)}
      {commands.length != 0 && mapOpen && (
        <MapModal open={mapOpen} setMapOpen={setMapOpen} />
      )}
      {commands.length != 0 && (
        <OrdersTable role={"client"} orders={commands} toggleMap={handleMapToggle}/>
      )}
    </div>
  );
};

export default ClientOrders;
