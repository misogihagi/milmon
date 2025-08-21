"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateFinalRarity } from "@/lib/rarity-calculator";
import data from "./data";

// 入力データのスキーマを定義
const formSchema = z.object({
  type: z.enum([
    "牛乳",
    "特別牛乳",
    "成分調整牛乳",
    "低脂肪牛乳",
    "無脂肪牛乳",
    "加工乳",
    "乳飲料",
    "その他",
  ]),
  fatContent: z.number().min(0).max(100),
  solidContent: z.number().min(0).max(100),
  origin: z.enum(["未記載", "国産", "産地指定", "牧場指定", "牛指定"]),
  sterilization: z.enum(["高温殺菌", "低温殺菌", "無殺菌"]),
  cowType: z.enum([
    "ホルスタイン",
    "ジャージー",
    "ガーンジー",
    "ブラウンスイス",
    "エアーシャ",
  ]),
  breedingMethod: z.enum(["つなぎ", "放牧"]),
  feed: z.enum(["粗飼料・濃厚飼料混合", "濃厚飼料のみ", "粗飼料のみ"]),
});

export default function RarityCalculatorForm({
  handleSubmit,
}: {
  handleSubmit: (d: (typeof data)[0]) => void;
}) {
  const [rarityResult, setRarityResult] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "牛乳",
      fatContent: 3.5,
      solidContent: 8.3,
      origin: "未記載",
      sterilization: "高温殺菌",
      cowType: "ホルスタイン",
      breedingMethod: "つなぎ",
      feed: "粗飼料・濃厚飼料混合",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const rarity = calculateFinalRarity(values);
    setRarityResult(rarity);
    const candidates = data.filter((m) => m.rarity === rarity);
    const monster = candidates[
      Math.floor(Math.random() * candidates.length)
    ] as (typeof data)[0];
    handleSubmit(monster);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>種類別名称</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="種類を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="牛乳">牛乳</SelectItem>
                      <SelectItem value="特別牛乳">特別牛乳</SelectItem>
                      <SelectItem value="成分調整牛乳">成分調整牛乳</SelectItem>
                      <SelectItem value="低脂肪牛乳">低脂肪牛乳</SelectItem>
                      <SelectItem value="無脂肪牛乳">無脂肪牛乳</SelectItem>
                      <SelectItem value="加工乳">加工乳</SelectItem>
                      <SelectItem value="乳飲料">乳飲料</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="fatContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>乳脂肪分 (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="例: 3.8"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="solidContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>無脂乳固形分 (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="例: 8.5"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>産地</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="産地を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="未記載">未記載</SelectItem>
                      <SelectItem value="国産">国産</SelectItem>
                      <SelectItem value="産地指定">産地指定</SelectItem>
                      <SelectItem value="牧場指定">牧場指定</SelectItem>
                      <SelectItem value="牛指定">牛指定</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sterilization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>殺菌方法</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="殺菌方法を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="高温殺菌">高温殺菌</SelectItem>
                      <SelectItem value="低温殺菌">低温殺菌</SelectItem>
                      <SelectItem value="無殺菌">無殺菌</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cowType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>牛種</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="牛種を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ホルスタイン">ホルスタイン</SelectItem>
                    <SelectItem value="ジャージー">ジャージー</SelectItem>
                    <SelectItem value="ガーンジー">ガーンジー</SelectItem>
                    <SelectItem value="ブラウンスイス">
                      ブラウンスイス
                    </SelectItem>
                    <SelectItem value="エアーシャ">エアーシャ</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="breedingMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>飼育方法</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="飼育方法を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="つなぎ">つなぎ</SelectItem>
                      <SelectItem value="放牧">放牧</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>飼料</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="飼料を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="粗飼料・濃厚飼料混合">
                        粗飼料・濃厚飼料混合
                      </SelectItem>
                      <SelectItem value="濃厚飼料のみ">濃厚飼料のみ</SelectItem>
                      <SelectItem value="粗飼料のみ">粗飼料のみ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            レアリティを計算
          </Button>
        </form>
      </Form>
      {rarityResult && (
        <div className="mt-8 text-center p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <Label className="text-xl font-semibold">
            あなたの牛乳のレアリティは...
          </Label>
          <div className="mt-4 text-4xl font-bold text-blue-600 dark:text-blue-400">
            {rarityResult}
          </div>
        </div>
      )}
    </div>
  );
}
