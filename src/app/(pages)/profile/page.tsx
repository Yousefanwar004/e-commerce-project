"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader, Plus } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { addAddressAction, getAllAddress } from "./_action/addAddress"
import { allAddress } from "@/interfaces/address"
import Loading from "@/app/loading"
import { deleteAddressAction } from "./_action/removeAddress"

export default function Profile() {
  const nameInput = useRef<HTMLInputElement>(null)
  const detailsInput = useRef<HTMLInputElement>(null)
  const phoneInput = useRef<HTMLInputElement>(null)
  const cityInput = useRef<HTMLInputElement>(null)

  const [isChecking, setIsChecking] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [addresses, setAddresses] = useState<allAddress[]>([])

  async function fetchAddresses() {
    setIsLoading(true)
    const res = await getAllAddress()
    setAddresses(res.data)
    setIsLoading(false)
  }

  async function addAddress() {
    setIsChecking(true)

    await addAddressAction(
      nameInput.current!.value,
      detailsInput.current!.value,
      phoneInput.current!.value,
      cityInput.current!.value
    )

    await fetchAddresses()
    setIsChecking(false)
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  async function deleteAddress(addressId: string) {
    setRemovingId(addressId)
    await deleteAddressAction(addressId)
    await fetchAddresses()
    setRemovingId(null)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Addresses</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black text-white">
              <Plus /> Add Address
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Shipping Address</DialogTitle>
              <DialogDescription>
                Make sure your address is correct
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3">
              <Label>Name</Label>
              <Input ref={nameInput} placeholder="Home / Work" />

              <Label>City</Label>
              <Input ref={cityInput} />

              <Label>Details</Label>
              <Input ref={detailsInput} />

              <Label>Phone</Label>
              <Input ref={phoneInput} />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={addAddress}>
                {isChecking ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Address List */}
      <div>
        {isLoading ? (
          <Loading />
        ) : addresses.length === 0 ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold">
                No addresses found
              </p>
              <p className="text-gray-500 text-sm">
                You haven’t added any address yet
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <Card
                key={address._id}
                className="hover:shadow-md transition"
              >
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">
                    {address.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {address.details}
                  </p>

                  <div className="text-sm">
                    <span className="font-medium">City:</span>{" "}
                    {address.city}
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Phone:</span>{" "}
                    {address.phone}
                  </div>
                </CardContent>

                <Button
                  className="w-1/4 mx-auto bg-red-500 cursor-pointer"
                  onClick={() => deleteAddress(address._id)}
                >
                  {removingId === address._id ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Remove"
                  )}
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
