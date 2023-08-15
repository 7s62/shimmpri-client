const DetailContainer: React.FC<{title: string; data: string}> = ({
  title,
  data,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="">{title}</div>
      <p>{data}</p>
    </div>
  );
};
const MintNFT: React.FC<{}> = ({}) => {
  return (
    <div className="h-screen text-white py-24 px-6">
      <div className="max-w-[1300px] mx-auto flex justify-between items-center">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-[80px] leading-[80px] font-extrabold">
            <p>Create your</p>
            <p className="inline-block">Own</p>
            <span className="text-tao">NFT Dream</span>
            <p>Gallery</p>
          </h1>
          <div className="flex justify-center items-center space-x-6 py-6">
            <p className="text-[28px] leading-[21px] font-extrabold text-tao">
              Skyline
            </p>
            <p className="text-[16px] leading-[26px]">
              <p>
                The Larges NFT Collection. Automatic and truly unique digital
              </p>
              <p>
                creation. Signed and issued by the creator, made possible by
              </p>
              <p> blockchain technologi</p>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div>
            <img
              className="max-w-[388px] max-h-[463px]  boder-none rounded-xl"
              src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/90234375_831684853993938_3886786635118936064_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7a1959&_nc_ohc=AWy0Fglj4aQAX-u3dLV&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDZGFraiPAk3cx0kbuMCGuu7Wpk5uAXdswyJEidMqhz9g&oe=6501E675"
              alt="nft"
            />
            <div className="flex flex-col space-y-3 py-2">
              <div className="flex justify-center items-center space-x-4">
                <DetailContainer title="Session" data="1" />
                <DetailContainer title="Remaining" data="240" />
                <DetailContainer title="Total" data="300" />
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="bg-btnprimary w-full text-[20px] leading-[32px] font-bold px-6 py-2 border border-none rounded-3xl">
                  Mint Now
                </button>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <p>End time remaining: </p>
                <p className="font-bold">{new Date().toISOString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MintNFT;
