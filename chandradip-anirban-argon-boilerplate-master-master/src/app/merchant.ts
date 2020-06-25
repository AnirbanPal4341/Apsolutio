export interface IEmployee {
  _id: string;
  UserType: string;
  MerchantName: string;
  BranchName: string;
  Location: string;
  CurrentStatus: string;
  PdfLinks: Array<string>;
}
