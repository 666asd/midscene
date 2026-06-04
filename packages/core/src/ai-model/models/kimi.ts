import type { TModelFamily } from '@midscene/shared/env';
import type {
  ChatCompletionCallContext,
  ChatCompletionParamsResult,
  ModelAdapterDefinition,
} from './types';

const buildKimiChatCompletionParams = (
  input: ChatCompletionCallContext,
): ChatCompletionParamsResult => {
  const { userConfig } = input;
  const effectiveReasoningEnabled = userConfig.reasoningEnabled ?? false;

  return {
    config: {
      temperature: undefined,
      thinking: {
        type: effectiveReasoningEnabled ? 'enabled' : 'disabled',
      },
    },
  };
};

export const kimiAdapters = {
  kimi: {
    chatCompletion: {
      unsupportedUserConfig: ['reasoningEffort', 'reasoningBudget'],
      buildChatCompletionParams: buildKimiChatCompletionParams,
    },
    locate: {
      resultAdapter: {
        coordinates: { shape: 'point', order: 'xy', normalizedBy: 1 },
      },
    },
  },
} satisfies Pick<Record<TModelFamily, ModelAdapterDefinition>, 'kimi'>;
