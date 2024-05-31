import UserModel from "@/db/models/user";

export type userParamsDetail = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params }: userParamsDetail) => {
  // console.log(request,"<<<<");

  const user = await UserModel.getUserById(params.id);

  return Response.json(user);
};
