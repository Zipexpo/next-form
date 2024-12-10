"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const CreateCollectionButton = ({ userId }) => {
  const router = useRouter();

  const handleCreate = async () => {
    // Create a new collection
    const response = await fetch("/api/collection/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: "New Collection" }),
    });

    if (response.ok) {
      const { collection } = await response.json();
      // Redirect to the edit page for the new collection
      router.push(`/manage-form/${collection._id}/edit`);
    } else {
      console.error("Failed to create collection");
    }
  };

  return (
    <Button onClick={handleCreate}>
      <Plus /> Creat new collection
    </Button>
  );
};

export default CreateCollectionButton;
