"use client";
import db from "@/firebase";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Query, DocumentData } from "@firebase/firestore-types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";

interface Order {
  total: number;
  timestamp: string;
  id: string;
  items: Item[];
}

interface Item {
  description: string;
  amount_total: number;
  quantity: number;
  images: string[];
}

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
            <div className="flex flex-col flex-center">
              {orders.map((order: Order) => {
                return (
                  <div key={order.id} className="w-[min(95%,850px)]">
                    <div className="grid grid-cols-3">
                      <p>Order Date</p>
                      <p>Order #</p>
                      <p>Total</p>
                      <p>{order.timestamp}</p>
                      <p>{order.id}</p>
                      <p>{order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      {order.items.map((item: Item) => {
                        return (
                          <div key={item.description}>
                            <h2>{item.description}</h2>
                            <p>£{item.amount_total}</p>
                            <p>{item.quantity}</p>
                            <Image
                              src={item.images[0]}
                              alt={item.description}
                              width={150}
                              height={150}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
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
    const date = new Date(doc.data().timeStamp * 1000);
    const dateString = date.toDateString();
    console.log(doc.id, " => ", doc.data());
    orders.push({
      ...doc.data(),
      timestamp: dateString,
      id: doc.id,
    });
  });

  return orders;
};

export default Orders;
