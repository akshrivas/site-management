import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import useSite from "src/hooks/useSite";

const useStock = () => {
  const [data, setData] = useState(null);
  const [details, setDetails] = useState(null);
  const site = useSite();
  let firestoreObj = {
    collection: "sites",
    doc: site,
    subcollections: [
      {
        collection: "stock",
        orderBy: ["date", "desc"],
      },
    ],
    storeAs: `stock`,
  };
  useFirestoreConnect([{ ...firestoreObj }]);

  const stock = useSelector((state) => state.firestore.ordered["stock"]);

  useEffect(() => {
    setData(stock);
    const totalPackets = stock?.reduce((acc, current) => {
      acc += current.packets;
      return acc;
    }, 0);
    setDetails({
      packets: totalPackets,
      weight: Math.floor((totalPackets * 40) / 1000),
    });
  }, [stock]);

  return {
    data,
    details,
    isLoading: !isLoaded(stock),
  };
};

export default useStock;
