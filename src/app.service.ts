import { Injectable } from "@nestjs/common";
import { MerkleRootService } from "./merkleroot/merkleroot.service";
import { DropperService } from "./dropper/dropper.service";
const cron = require("node-cron");

@Injectable()
export class AppService {
  constructor(
    private readonly merkleRootService: MerkleRootService,
    private readonly dropperService: DropperService
  ) {}

  async merkleRoot(req) {
    try {
      let {
        file,
        walletAddress,
        tokenAddress,
        startDate,
        endDate,
        dropName,
        decimal,
        totalAmount,
      } = req.body;
      let csvfile = await this.merkleRootService.generateClaimsCsv(
        file,
        decimal
      );
      const refactorFile = await this.merkleRootService.removeDuplicateAddress(
        csvfile,
        decimal
      );
      let result = await this.merkleRootService.generateMerkleRoot(
        refactorFile,
        decimal
      );
      const response = await this.dropperService.addDropper(
        walletAddress,
        tokenAddress,
        startDate,
        endDate,
        dropName,
        result.jsonFile,
        totalAmount,
        result._merkleRoot
      );
      let data = { ...result, dropper_id: response.dropperId };
      return data;
    } catch (e) {
      console.log("view error", e);
      throw e;
    }
  }

  async generateJwt(req) {
    try {
      const token = await this.dropperService.genToken(req);
      return token;
    } catch (error) {
      console.log("check error now", error);
      throw error;
    }
  }
}
