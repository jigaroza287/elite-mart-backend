export const successResponse = (data: any) => ({
  status: "success",
  data,
});

export const errorResponse = (message: string) => ({
  status: "error",
  message,
});
