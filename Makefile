# Makefile - Tier-1380 Checkpoint-based execution

CHECKPOINT_DIR := .tier1380-checkpoints

.PHONY: all validate release check reset demo

all: check validate release

check:
	@mkdir -p $(CHECKPOINT_DIR)
	@if [ -f $(CHECKPOINT_DIR)/validate.done ]; then \
		echo "⚠️  Validation checkpoint exists"; \
	fi

validate:
	@if [ -f $(CHECKPOINT_DIR)/validate.done ]; then \
		read -p "Validation already done. Re-run? [y/N] " ans; \
		if [ "$$ans" != "y" ]; then \
			echo "Skipping validation"; \
			exit 0; \
		fi; \
	fi
	@echo "🔍 Running Tier-1380 validation..."
	bun scripts/validate-pointers.ts --bun-native
	@touch $(CHECKPOINT_DIR)/validate.done
	@echo "✅ Checkpoint: validate"

release: validate
	@if [ -f $(CHECKPOINT_DIR)/release.done ]; then \
		read -p "Release already created. Overwrite? [y/N] " ans; \
		if [ "$$ans" != "y" ]; then exit 0; fi; \
	fi
	@echo "📦 Creating release..."
	@if [ -f scripts/release-archive.sh ]; then \
		./scripts/release-archive.sh; \
	else \
		echo "Release script not found, skipping"; \
	fi
	@touch $(CHECKPOINT_DIR)/release.done
	@echo "✅ Checkpoint: release"

reset:
	rm -rf $(CHECKPOINT_DIR)
	@echo "🔄 Checkpoints cleared"

demo:
	@echo "🧪 Running LoopGuard demo..."
	bun scripts/demo-loop-guard.ts
