import Image from "next/image";
import Link from "next/link";

const MenuItem = (item) => {
  return (
    <Link href={`/tourdetails/${item._id}`} className="border rounded-lg">
      <div className="relative w-80 h-52">
        <Image
          src={item.image}
          width={300}
          height={300}
          layout="responsive"
          className="rounded-t-lg"
          alt="tourItem"
        />
      </div>
      <div className="ml-4 max-w-72 flex flex-col gap-2 mt-2">
        <div className="text-gray-500 text-sm">{item.category}</div>
        <div className="h-10">
          <p className="">{item.name}</p>
        </div>
        <div className="text-sm text-gray-500">{item.duration}</div>
        <div className="">from Rs. {item.price}</div>
      </div>
    </Link>
  );
};

export default MenuItem;
