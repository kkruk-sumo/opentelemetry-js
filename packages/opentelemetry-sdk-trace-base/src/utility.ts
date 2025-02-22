/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Sampler } from '@opentelemetry/api';
import { buildSamplerFromEnv, DEFAULT_CONFIG } from './config';
import { SpanLimits, TracerConfig } from './types';

/**
 * Function to merge Default configuration (as specified in './config') with
 * user provided configurations.
 */
export function mergeConfig(userConfig: TracerConfig): TracerConfig & { sampler: Sampler; spanLimits: SpanLimits } {
  const perInstanceDefaults: Partial<TracerConfig> = {
    sampler: buildSamplerFromEnv(),
  };

  const target = Object.assign(
    {},
    DEFAULT_CONFIG,
    perInstanceDefaults,
    userConfig
  );

  target.spanLimits = Object.assign(
    {},
    DEFAULT_CONFIG.spanLimits,
    userConfig.spanLimits || {}
  );

  return target;
}
