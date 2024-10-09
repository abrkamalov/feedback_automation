<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-6">Guest Feedback Management</h1>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[180px]">Guest Name</TableHead>
            <TableHead class="w-[100px]">Room Number</TableHead>
            <TableHead class="max-w-[300px]">Feedback</TableHead>
            <TableHead class="w-[200px]">Tags</TableHead>
            <TableHead class="max-w-[250px]">Actions Taken</TableHead>
            <TableHead class="w-[80px]">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="feedback in feedbackStore.feedbacks" :key="feedback.id">
            <TableCell class="font-medium">{{ feedback.guest_name }}</TableCell>
            <TableCell>{{ feedback.room_number }}</TableCell>
            <TableCell class="max-w-[300px]">
              <p class="truncate">{{ feedback.content }}</p>
            </TableCell>
            <TableCell>
              <div class="flex flex-wrap gap-1">
                <Badge v-for="tag in feedback.tags" :key="tag.id" variant="secondary">
                  {{ tag.name }}
                </Badge>
              </div>
            </TableCell>
            <TableCell class="max-w-[250px]">
              <ul class="list-disc list-inside">
                <li v-for="action in feedback.action_logs" :key="action.id" class="text-sm">
                  {{ action.details }}
                </li>
              </ul>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" class="h-8 w-8 p-0" @click="removeFeedback(feedback.id)">
                <XIcon class="h-4 w-4" />
                <span class="sr-only">Remove</span>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { useFeedbackStore } from '@/stores/feedbackStore';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { XIcon } from 'lucide-vue-next';

const feedbackStore = useFeedbackStore();
feedbackStore.fetchFeedbacks();

const removeFeedback = (id) => {
  if (confirm('Are you sure you want to remove this feedback?')) {
    feedbackStore.removeFeedback(id);
  }
};
</script>

<style scoped>
</style>
