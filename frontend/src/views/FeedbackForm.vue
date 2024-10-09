<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <Card class="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl font-semibold text-center">Guest Feedback</CardTitle>
        <CardDescription class="text-center">We value your opinion. Please share your thoughts about your stay.</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="submitFeedback" class="space-y-6">
          <div class="space-y-2">
            <Label for="guest_name">
              Guest Name <span class="text-red-500">*</span>
            </Label>
            <Input
              id="guest_name"
              v-model="feedback.guest_name"
              placeholder="Enter your name"
              required
              :class="{ 'border-red-500': showErrors && !feedback.guest_name.trim() }"
            />
            <p v-if="showErrors && !feedback.guest_name.trim()" class="text-sm text-red-500">
              Guest name is required
            </p>
          </div>
          <div class="space-y-2">
            <Label for="room_number">
              Room Number <span class="text-red-500">*</span>
            </Label>
            <Input
              id="room_number"
              v-model="feedback.room_number"
              placeholder="Enter your room number"
              required
              :class="{ 'border-red-500': showErrors && !feedback.room_number.trim() }"
            />
            <p v-if="showErrors && !feedback.room_number.trim()" class="text-sm text-red-500">
              Room number is required
            </p>
          </div>
          <div class="space-y-2">
            <Label for="content">
              Feedback <span class="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              v-model="feedback.content"
              placeholder="Please share your feedback about your stay"
              required
              class="min-h-[100px]"
              :class="{ 'border-red-500': showErrors && !feedback.content.trim() }"
            />
            <p v-if="showErrors && !feedback.content.trim()" class="text-sm text-red-500">
              Feedback is required
            </p>
          </div>
          <p class="text-sm text-gray-500">
            Fields marked with <span class="text-red-500">*</span> are required
          </p>
        </form>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="submitFeedback" :disabled="isLoading">
          <template v-if="isLoading">
            <Loader2Icon class="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </template>
          <template v-else>
            Submit Feedback
          </template>
        </Button>
      </CardFooter>
    </Card>
    <Toaster />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useToast } from '@/components/ui/toast/use-toast';
import { Toaster } from '@/components/ui/toast/';
import apiService from '@/services/apiService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon } from 'lucide-vue-next';

const { toast } = useToast();

const feedback = ref({
  guest_name: '',
  room_number: '',
  content: '',
});

const isLoading = ref(false);
const showErrors = ref(false);

const isFormValid = computed(() => {
  return feedback.value.guest_name.trim() !== '' &&
         feedback.value.room_number.trim() !== '' &&
         feedback.value.content.trim() !== '';
});

const submitFeedback = async () => {
  if (isLoading.value) return;
  
  showErrors.value = true;
  
  if (!isFormValid.value) {
    toast({
      title: 'Validation Error',
      description: 'Please fill in all required fields.',
      variant: 'destructive',
    });
    return;
  }
  
  isLoading.value = true;
  try {
    await apiService.post('/feedbacks', { feedback: feedback.value });
    toast({
      title: 'Feedback Submitted',
      description: 'Thank you for your feedback!',
    });
    feedback.value = { guest_name: '', room_number: '', content: '' };
  } catch (error) {
    console.error(error);
    toast({
      title: 'Error',
      description: 'An error occurred while submitting your feedback.',
      variant: 'destructive',
    });
  } finally {
    isLoading.value = false;
    showErrors.value = false;
  }
};
</script>
