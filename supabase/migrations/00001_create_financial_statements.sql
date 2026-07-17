-- 财务报表数据表
create table public.financial_statements (
  id uuid primary key default gen_random_uuid(),
  year integer not null,
  report_type text not null check (report_type in ('balance_sheet', 'income_statement', 'cash_flow_statement')),
  item_key text not null,
  item_name text not null,
  amount numeric(18,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (year, report_type, item_key)
);

create index idx_fs_year_type on public.financial_statements (year, report_type);
create index idx_fs_type on public.financial_statements (report_type);

-- 自动更新 updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_fs_updated_at
before update on public.financial_statements
for each row execute function public.set_updated_at();

-- 启用 RLS
alter table public.financial_statements enable row level security;

-- 无登录场景：anon 与 authenticated 均拥有完整读写权限
create policy "fs_select_anon" on public.financial_statements for select to anon using (true);
create policy "fs_insert_anon" on public.financial_statements for insert to anon with check (true);
create policy "fs_update_anon" on public.financial_statements for update to anon using (true) with check (true);
create policy "fs_delete_anon" on public.financial_statements for delete to anon using (true);

create policy "fs_select_auth" on public.financial_statements for select to authenticated using (true);
create policy "fs_insert_auth" on public.financial_statements for insert to authenticated with check (true);
create policy "fs_update_auth" on public.financial_statements for update to authenticated using (true) with check (true);
create policy "fs_delete_auth" on public.financial_statements for delete to authenticated using (true);