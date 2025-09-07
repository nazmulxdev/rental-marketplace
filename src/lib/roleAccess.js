export const roleAccess = {
  SUPER_ADMIN: ["/dashboard"], // full access
  ADMIN: [
    "/dashboard",
    "/dashboard/add-listing",
    "/dashboard/my-listings",
    "/dashboard/messages",
    "/dashboard/profile",
    "/dashboard/settings",
  ],
  MEMBER: [
    "/dashboard",
    "/dashboard/my-listings",
    "/dashboard/messages",
    "/dashboard/profile",
  ],
  USER: [
    "/dashboard",
    "/dashboard/profile",
  ],
};
