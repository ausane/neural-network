import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { usePathname } from "next/navigation"

export function PaginationComponent() {
  const pathname = usePathname()

  const isActive = (v: string): boolean => pathname === `/neural-network/${v}`
  return (
    <Pagination className="bg-white rounded-md">
      <PaginationContent className="max-sm:flex">
        <PaginationItem>
          <PaginationLink href="/neural-network/v1" isActive={isActive("v1")}>
            v1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/neural-network/v2" isActive={isActive("v2")}>
            v2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/neural-network/v3" isActive={isActive("v3")}>
            v3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/neural-network/v4" isActive={isActive("v4")}>
            v4
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
