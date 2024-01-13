"use client";
import db from "@/firebase";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Query, DocumentData } from "@firebase/firestore-types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Orders = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([] as any);

  useEffect(() => {
    if (session) {
      getOrders(session).then((result) => {
        setOrders(result);
      });
    }
  }, [session]);

  return (
    <div className="flex-center">
      <div className="responsive-width py-5">
        <h1 className="text-4xl font-bold pb-2 border-b-2 border-red-300">
          Orders
        </h1>
        {session ? (
          <div>
            <h2 className="text-2xl font-semibold">
              {session?.user?.name}&apos;s Orders
            </h2>
            <div>{orders}</div>
          </div>
        ) : (
          <h2 className="text-2xl font-semibold">
            Please sign in to view your orders
          </h2>
        )}
      </div>
    </div>
  );
};

const getOrders = async (session: any) => {
  const orders = [];

  const q = query(collection(db, "users", session?.user?.email, "orders"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const date = new Date(doc.data());
    const dateString = date.toDateString();
    console.log(doc.id, " => ", doc.data());
    orders.push({
      ...doc.data(),
      timestamp: dateString,
    });
  });

  console.log(orders);

  return;
};

export default Orders;
