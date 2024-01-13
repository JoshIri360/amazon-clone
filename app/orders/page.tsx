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
        <h1 className="text-4xl font-bold pb-2 border-b-2 border-[#f3a847]">
          Orders
        </h1>
        {session ? (
          <div className="mt-5 flex flex-col flex-center gap-8">
            {orders.map((order: Order) => {
              return (
                <div
                  key={order.id}
                  className="w-[min(95%,850px)] rounded-xl overflow-hidden"
                >
                  <div className="grid grid-cols-3 bg-[#232f3e] text-white p-3">
                    <p className="font-bold">Order Date</p>
                    <p className="font-bold">Order #</p>
                    <p className="font-bold text-right">Total</p>
                    <p>{order.timestamp}</p>
                    <p>{order.id}</p>
                    <p className="text-right">£ {order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex bg-white p-4 gap-5">
                    {order.items.map((item: Item) => {
                      return (
                        <div key={item.description} className="relative">
                          <p className="absolute right-3 bottom-3 p-2 py-1 rounded-md bg-slate-200 bg-opacity-85">
                            {item.quantity}
                          </p>
                          <div className="w-44 h-48 flex-center">
                            <Image
                              src={item.images[0]}
                              alt={item.description}
                              width={0}
                              height={0}
                              sizes="_"
                              style={{
                                width: "7rem",
                                height: "auto",
                                maxHeight: "15rem",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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

interface Orders extends Array<Order> {}

const getOrders = async (session: any) => {
  const orders: Orders = [];

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
      total: doc.data().total,
      items: doc.data().items,
    });
  });

  return orders;
};

export default Orders;
